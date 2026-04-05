import pytest
from reclassify_berakah import reclassify_products

def test_reclassify_bandoleras():
    products = [
        {"name": "Bandolera clásica", "price": 0, "category": ""},
        {"name": "Bolso con cinta ajustable", "price": 0, "category": ""},
        {"name": "BANDOLERA NEGRA", "price": 0, "category": ""} # Test uppercase
    ]
    result = reclassify_products(products)

    assert len(result) == 3
    for p in result:
        assert p["category"] == "Bandoleras"
        assert p["price"] == 1250

def test_reclassify_totes_boutique():
    products = [
        {"name": "Bolson de piel", "price": 0, "category": ""},
        {"name": "Bolso grande", "price": 0, "category": ""},
        {"name": "Bolso mediano", "price": 0, "category": ""}
    ]
    result = reclassify_products(products)

    assert len(result) == 3
    for p in result:
        assert p["category"] == "Totes Boutique"
        assert p["price"] == 1850

def test_reclassify_siluetas():
    products = [
        {"name": "Bolsa redonda", "price": 0, "category": ""},
        {"name": "Bolsa cilindro", "price": 0, "category": ""},
        {"name": "Bolsa cuadrada", "price": 0, "category": ""}
    ]
    result = reclassify_products(products)

    assert len(result) == 3
    for p in result:
        assert p["category"] == "Siluetas"
        assert p["price"] == 1450

def test_reclassify_accesorios():
    products = [
        {"name": "Monedero rojo", "price": 0, "category": ""},
        {"name": "Llavero de cuero", "price": 0, "category": ""},
        {"name": "Nuevos diseños", "price": 0, "category": ""}
    ]
    result = reclassify_products(products)

    assert len(result) == 3
    for p in result:
        assert p["category"] == "Accesorios"
        assert p["price"] == 450

def test_reclassify_default():
    products = [
        {"name": "Cartera X", "price": 0, "category": ""},
        {"name": "Un producto cualquiera", "price": 0, "category": ""}
    ]
    result = reclassify_products(products)

    assert len(result) == 2
    for p in result:
        assert p["category"] == "Bandoleras"
        assert p["price"] == 1250

def test_reclassify_empty_list():
    assert reclassify_products([]) == []

def test_reclassify_does_not_mutate_input():
    original = [{"name": "Bolson", "price": 0, "category": ""}]
    result = reclassify_products(original)

    assert result[0]["category"] == "Totes Boutique"
    assert original[0]["category"] == ""
    assert original[0]["price"] == 0
