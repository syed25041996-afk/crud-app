from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import product
from schemas.product import Product
from db.database import engine, get_db
from sqlalchemy.orm import Session


app = FastAPI()

# add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

product.Base.metadata.create_all(bind=engine)


@app.get("/api")
async def root():
    return {"message": "Hello World"}


@app.get("/api/products")
async def get_products(db: Session = Depends(get_db)):
    products = db.query(product.Product).all()
    return products


@app.get("/api/products/{id}")
async def get_product(id: int, db: Session = Depends(get_db)):
    db_product = db.query(product.Product).filter(product.Product.id == id).first()
    if db_product:
        return db_product
    return "Product not found"


@app.post("/api/products")
async def add_product(newProduct: Product,db: Session = Depends(get_db)):
    db_product = product.Product(**newProduct.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/api/products/{id}")
async def update_product(id: int, newProduct: Product, db: Session = Depends(get_db)):
    db_product = db.query(product.Product).filter(product.Product.id == id).first()
    if db_product:
        db_product.name = newProduct.name
        db_product.description = newProduct.description
        db_product.price = newProduct.price
        db_product.quantity = newProduct.quantity
        db.commit()
        db.refresh(db_product)
        return db_product
    return "Product not found"

@app.delete("/api/products/{id}")
async def delete_product(id: int,db: Session = Depends(get_db)):
    db_product = db.query(product.Product).filter(product.Product.id == id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return "Product deleted"
    return "Product not found"
