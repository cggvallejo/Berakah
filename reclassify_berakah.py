import json
import os

def classify_products():
    path = r'C:\Users\carl2\.gemini\antigravity\scratch\berakah-artesanal\src\data\products.js'
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extraer el JSON del archivo JS
    json_str = content.replace('export const products = ', '').strip().rstrip(';')
    products = json.loads(json_str)
    
    new_products = []
    
    for p in products:
        name = p['name'].lower()
        
        # Lógica de clasificación simple pero eficiente
        if 'bandolera' in name or 'cinta ajustable' in name:
            p['category'] = 'Bandoleras'
            p['price'] = 1250
        elif 'bolson' in name or 'grande' in name or 'mediano' in name:
            p['category'] = 'Totes Boutique'
            p['price'] = 1850
        elif 'redonda' in name or 'cilindro' in name or 'cuadrada' in name:
            p['category'] = 'Siluetas'
            p['price'] = 1450
        elif 'monedero' in name or 'llavero' in name or 'diseños' in name:
            p['category'] = 'Accesorios'
            p['price'] = 450
        else:
            p['category'] = 'Bandoleras' # Default premium
            p['price'] = 1250
            
        new_products.append(p)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"export const products = {json.dumps(new_products, indent=2, ensure_ascii=False)};")
        
    print(f"Re-clasificación completada: {len(new_products)} productos procesados.")

if __name__ == "__main__":
    classify_products()
