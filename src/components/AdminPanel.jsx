import React, { useState, useEffect, useRef, useMemo } from 'react';
import { products as defaultProducts } from '../data/products';

// ─── Credenciales ────────────────────────────────────────────────────────────
const ADMIN_USER = 'berakah';
const ADMIN_PASS = 'berakah1';
const STORAGE_KEY = 'berakah_products_override';

// ─── Categorías disponibles ──────────────────────────────────────────────────
const CATEGORIES = ['Bandoleras', 'Bolsas', 'Mochilas', 'Portacelulares', 'Esenciales'];

// ─── Hook: productos con persistencia ──────────────────────────────────────
function useAdminProducts() {
  const loadProducts = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [...defaultProducts];
    } catch {
      return [...defaultProducts];
    }
  };

  const [products, setProducts] = useState(loadProducts);

  const save = (updated) => {
    setProducts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateProduct = (id, changes) => {
    save(products.map(p => (p.id === id ? { ...p, ...changes } : p)));
  };

  const addProduct = (newProduct) => {
    save([{ ...newProduct, id: String(Date.now()) }, ...products]);
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts([...defaultProducts]);
  };

  return { products, updateProduct, addProduct, resetAll, setProducts };
}

// ─── Lógica de Sincronización GitHub ──────────────────────────────────────────
const GITHUB_REPO = 'cggvallejo/Berakah';
const FILE_PATH = 'src/data/products.js';

async function syncWithGithub(token, updatedProducts) {
  if (!token) throw new Error('No hay token configurado');
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // 1. Obtener el archivo actual (para sacar el SHA necesario para actualizar)
  const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, { headers });
  if (!getRes.ok) throw new Error('Error al obtener el archivo del repositorio');
  const fileData = await getRes.json();
  const sha = fileData.sha;

  // 2. Preparar el nuevo contenido
  const jsContent = `export const products = ${JSON.stringify(updatedProducts, null, 2)};\n`;
  // Codificar en Base64 asegurando que no se rompa con acentos (UTF-8)
  const base64Content = btoa(unescape(encodeURIComponent(jsContent)));

  // 3. Hacer el commit
  const putRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'Actualización del catálogo de productos desde el Panel web',
      content: base64Content,
      sha: sha
    })
  });

  if (!putRes.ok) {
    const errorData = await putRes.json();
    throw new Error(errorData.message || 'Error al hacer el commit en GitHub');
  }
}

// ─── Modal de Configuración GitHub ───────────────────────────────────────────
function ConfigModal({ token, onSave, onClose }) {
  const [val, setVal] = useState(token || '');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Configuración Git</h3>
        <p className="text-gray-500 text-xs mb-4">Ingresa tu GitHub Personal Access Token para sincronizar cambios y automatizar despiliegues en Render mediante commits directos.</p>
        
        <input 
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxx"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm mb-4"
        />

        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={() => onSave(val)}
            className="flex-1 bg-amber-500 text-black py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente Login ────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1a0e07 0%, #2d1a0a 50%, #1a0e07 100%)' }}>
      
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, #d4af37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b6914 0%, transparent 50%)'
      }} />

      <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-sm mx-4 shadow-2xl transition-transform ${shake ? 'animate-bounce' : ''}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-2">Panel de Control</p>
          <h1 className="font-serif text-white text-4xl tracking-wider">Berakah</h1>
          <div className="w-12 h-px bg-amber-400/60 mx-auto mt-3" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Usuario</label>
            <input
              type="text"
              value={user}
              onChange={e => { setUser(e.target.value); setError(''); }}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all text-sm"
              placeholder="berakah"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setError(''); }}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all text-sm"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-400/10 rounded-lg py-2 px-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all duration-300 mt-2"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Modal de edición de producto ────────────────────────────────────────────
function EditModal({ product, onSave, onClose, isSyncing }) {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
  });
  const [imgPreview, setImgPreview] = useState(product.image);
  const [imgLoading, setImgLoading] = useState(false);
  const fileRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setImgPreview(dataUrl);
      setForm(f => ({ ...f, image: dataUrl }));
      setImgLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(product.id, { ...form, price: Number(form.price) });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => !isSyncing && e.target === e.currentTarget && onClose()}>
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
        style={{ scrollbarWidth: 'thin' }}>
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between px-8 py-5 border-b border-gray-100 rounded-t-3xl">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold">{product.id ? 'Editar Producto' : 'Nuevo Producto'}</p>
            <h2 className="font-serif text-gray-900 text-lg leading-tight mt-0.5 line-clamp-1">{form.name || 'Nuevo'}</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all text-lg leading-none">
            ×
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Imagen */}
          <div className="flex gap-6 items-start">
            <div className="relative flex-shrink-0 w-36 h-36 rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 cursor-pointer group"
              onClick={() => fileRef.current?.click()}>
              {imgLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <img
                    src={imgPreview}
                    alt={form.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectPosition: 'center 8%' }}
                    onError={e => { e.target.src = '/images/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-xs font-semibold">Cambiar</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold text-gray-700">Imagen del producto</p>
              <p className="text-xs text-gray-400">Haz clic en la imagen para subir un archivo desde tu dispositivo. Formatos: JPG, PNG, WebP.</p>
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Subir imagen
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Nombre del producto</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
            />
          </div>

          {/* Precio & Categoría */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Precio (MXN $)</label>
              <input
                type="number"
                min="1"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Categoría</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm bg-white appearance-none cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Descripción</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} disabled={isSyncing}
              className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-50">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={isSyncing}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isSyncing
                  ? 'bg-amber-300 text-black/50 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-black'
              }`}>
              {isSyncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/50 border-t-transparent rounded-full animate-spin" />
                  Sincronizando...
                </>
              ) : 'Guardar y Sincronizar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tarjeta de producto en el panel ──────────────────────────────────────────
function AdminProductCard({ product, onEdit }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover scale-[1.12] transition-transform duration-500 group-hover:scale-[1.18]"
          style={{ objectPosition: 'center 8%' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />
        <button
          onClick={() => onEdit(product)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-sm font-black px-6 py-2.5 rounded-full shadow-2xl whitespace-nowrap flex items-center gap-2 border border-gray-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
        <span className="absolute top-2 right-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-1 rounded-full">
          ${product.price.toLocaleString()}
        </span>
      </div>
      <div className="px-3 py-3">
        <p className="text-[9px] uppercase tracking-widest text-amber-600 font-semibold mb-0.5">{product.category}</p>
        <p className="text-xs text-gray-800 font-medium leading-tight line-clamp-2">{product.name}</p>
      </div>
    </div>
  );
}

// ─── Panel Principal ──────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }) {
  const { products, updateProduct, addProduct, resetAll } = useAdminProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: 'success' });
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('berakah_gh_token') || '');
  const [showConfig, setShowConfig] = useState(false);

  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: 'success' }), 4000);
  };

  const handleSaveConfig = (token) => {
    setGithubToken(token);
    localStorage.setItem('berakah_gh_token', token);
    setShowConfig(false);
    showToast('⚙️ Token configurado', 'success');
  };

  const handleSaveProduct = async (id, changes) => {
    if (!githubToken) {
      showToast('No hay Token configurado. Guarda solo local.', 'error');
      setShowConfig(true);
      return;
    }

    setIsSyncing(true);
    try {
      let updatedList;
      if (id) {
        updatedList = products.map(p => (p.id === id ? { ...p, ...changes } : p));
        updateProduct(id, changes);
      } else {
        const newProd = { ...changes, id: String(Date.now()) };
        updatedList = [newProd, ...products];
        addProduct(newProd);
      }

      await syncWithGithub(githubToken, updatedList);
      showToast('Sincronizado a GitHub (Render actualizando)', 'success');
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      showToast(`Error de GitHub: ${err.message}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      price: '',
      category: CATEGORIES[0],
      description: '',
      image: ''
    });
  };

  const handleReset = () => {
    resetAll();
    setShowResetConfirm(false);
    showToast('Catálogo restaurado a los valores originales');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Stats
  const totalProducts = products.length;
  const categoryCount = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat).length;
    return acc;
  }, {});
  const avgPrice = Math.round(products.reduce((s, p) => s + p.price, 0) / products.length);

  return (
    <div className="min-h-screen" style={{ background: '#f8f6f2', fontFamily: 'Inter, sans-serif' }}>
      {/* Toast */}
      {toastMsg.text && (
        <div className={`fixed top-6 right-6 z-[9999] text-white text-sm font-medium px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-pulse ${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-gray-900'}`}>
          <span className="text-xl leading-none">{toastMsg.type === 'error' ? '⚠️' : '✓'}</span>
          {toastMsg.text}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2d1a0a' }}>
              <span className="text-amber-400 font-serif text-lg font-bold">B</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-none">Panel Berakah</h1>
              <p className="text-xs text-gray-400 mt-0.5">Administración de catálogo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-xl transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver tienda
            </a>
            <button onClick={() => setShowConfig(true)}
              className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-2 rounded-xl transition-all font-semibold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              GitHub Git
            </button>
            <button onClick={handleAddProduct}
              className="flex items-center gap-2 text-xs text-black bg-amber-500 hover:bg-amber-400 px-3 py-2 rounded-xl transition-all font-bold uppercase tracking-wide">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo
            </button>
            <button onClick={() => setShowResetConfirm(true)}
              className="hidden sm:flex items-center gap-2 text-xs text-red-500 hover:text-red-700 border border-red-100 hover:border-red-200 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restaurar
            </button>
            <button onClick={onLogout}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-xl transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total productos', value: totalProducts, color: '#2d1a0a' },
            { label: 'Precio promedio', value: `$${avgPrice.toLocaleString()}`, color: '#b45309' },
            { label: 'Categorías', value: CATEGORIES.length, color: '#0f766e' },
            { label: 'Editados hoy', value: localStorage.getItem(STORAGE_KEY) ? '✓ Activos' : '—', color: '#6d28d9' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
              <p className="text-xl font-bold mt-1" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">×</button>
              )}
            </div>

            {/* Filtro categoría */}
            <div className="flex flex-wrap gap-2">
              {['Todos', ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat} {cat !== 'Todos' && categoryCount[cat] ? `(${categoryCount[cat]})` : ''}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Mostrando <strong className="text-gray-600">{filteredProducts.length}</strong> productos
          </p>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 font-medium">Sin resultados para "{searchQuery}"</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); }}
              className="mt-4 text-amber-600 text-sm underline">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map(product => (
              <AdminProductCard
                key={product.id}
                product={product}
                onEdit={setEditingProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal edición */}
      {editingProduct && (
        <EditModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setEditingProduct(null)}
          isSyncing={isSyncing}
        />
      )}

      {/* Modal Configuración */}
      {showConfig && (
        <ConfigModal 
          token={githubToken} 
          onSave={handleSaveConfig} 
          onClose={() => setShowConfig(false)} 
        />
      )}

      {/* Confirm reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">¿Restaurar catálogo?</h3>
            <p className="text-gray-500 text-sm mb-6">Se perderán todos los cambios de precio, descripción y categoría. Las imágenes subidas también se perderán.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetConfirm(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
                Cancelar
              </button>
              <button onClick={handleReset}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm transition-all">
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Componente Raíz del Panel ─────────────────────────────────────────────
export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('berakah_admin') === '1';
  });

  const handleLogin = () => {
    sessionStorage.setItem('berakah_admin', '1');
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('berakah_admin');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
