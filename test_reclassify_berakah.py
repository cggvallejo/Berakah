import pytest
from reclassify_berakah import process_product, process_products

def test_process_product_bandolera():
    product = {'id': 1, 'name': 'Hermosa Bandolera roja'}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras'
    assert processed['price'] == 1250
    assert processed is not product # ensure it's a copy

def test_process_product_cinta_ajustable():
    product = {'name': 'Bolsa con cinta ajustable'}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras'
    assert processed['price'] == 1250

def test_process_product_totes_boutique():
    product1 = {'name': 'Bolson elegante'}
    assert process_product(product1)['category'] == 'Totes Boutique'
    assert process_product(product1)['price'] == 1850

    product2 = {'name': 'Bolsa GRANDE'}
    assert process_product(product2)['category'] == 'Totes Boutique'

    product3 = {'name': 'Bolsa Mediano azul'}
    assert process_product(product3)['category'] == 'Totes Boutique'

def test_process_product_siluetas():
    product1 = {'name': 'Bolsa redonda'}
    assert process_product(product1)['category'] == 'Siluetas'
    assert process_product(product1)['price'] == 1450

    product2 = {'name': 'Forma de Cilindro'}
    assert process_product(product2)['category'] == 'Siluetas'

    product3 = {'name': 'Bolsa CUADRADA'}
    assert process_product(product3)['category'] == 'Siluetas'

def test_process_product_accesorios():
    product1 = {'name': 'Monedero pequeño'}
    assert process_product(product1)['category'] == 'Accesorios'
    assert process_product(product1)['price'] == 450

    product2 = {'name': 'Llavero de cuero'}
    assert process_product(product2)['category'] == 'Accesorios'

    product3 = {'name': 'Varios diseños disponibles'}
    assert process_product(product3)['category'] == 'Accesorios'

def test_process_product_default():
    product = {'name': 'Bolsa misteriosa'}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras' # Fallback
    assert processed['price'] == 1250

def test_process_product_missing_name():
    product = {'id': 123}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras' # Fallback
    assert processed['price'] == 1250
    assert processed['id'] == 123

def test_process_product_empty_name():
    product = {'name': ''}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras' # Fallback
    assert processed['price'] == 1250

def test_process_product_case_insensitivity():
    product = {'name': 'bAnDoLeRa'}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras'
    assert processed['price'] == 1250

def test_process_product_multiple_matches():
    # 'bandolera' comes first in the if-elif chain
    product = {'name': 'Bandolera grande'}
    processed = process_product(product)
    assert processed['category'] == 'Bandoleras'
    assert processed['price'] == 1250

def test_process_products():
    products = [
        {'name': 'bandolera'},
        {'name': 'bolson'},
        {'name': 'redonda'},
        {'name': 'monedero'},
        {'name': 'otra cosa'}
    ]
    processed = process_products(products)
    assert len(processed) == 5
    assert processed[0]['category'] == 'Bandoleras'
    assert processed[1]['category'] == 'Totes Boutique'
    assert processed[2]['category'] == 'Siluetas'
    assert processed[3]['category'] == 'Accesorios'
    assert processed[4]['category'] == 'Bandoleras' # Default
