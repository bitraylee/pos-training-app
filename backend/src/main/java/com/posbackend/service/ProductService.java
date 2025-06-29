package com.posbackend.service;

import com.posbackend.exception.DuplicateProductException;
import com.posbackend.exception.ProductNotFoundException;
import com.posbackend.model.Product;
import com.posbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    
    private final ProductRepository productRepository;
    
    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    // Create a new product
    public Product createProduct(Product product) {
        // Check if product with same name already exists
        if (productRepository.existsByNameIgnoreCase(product.getName())) {
            throw new DuplicateProductException("Product with name '" + product.getName() + "' already exists");
        }
        return productRepository.save(product);
    }
    
    // Get all products
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Get product by ID
    @Transactional(readOnly = true)
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    // Get product by name
    @Transactional(readOnly = true)
    public Optional<Product> getProductByName(String name) {
        return productRepository.findByNameIgnoreCase(name);
    }
    
    // Update product
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        
        // Check if the new name conflicts with existing product (excluding current product)
        if (!product.getName().equalsIgnoreCase(productDetails.getName()) &&
            productRepository.existsByNameIgnoreCase(productDetails.getName())) {
            throw new DuplicateProductException("Product with name '" + productDetails.getName() + "' already exists");
        }
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        
        return productRepository.save(product);
    }
    
    // Delete product
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }
    
    // Search products by name
    @Transactional(readOnly = true)
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get products by price range
    @Transactional(readOnly = true)
    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    // Get products with low stock
    @Transactional(readOnly = true)
    public List<Product> getProductsWithLowStock(Integer threshold) {
        return productRepository.findByStockQuantityLessThan(threshold);
    }
    
    // Get available products (stock > 0)
    @Transactional(readOnly = true)
    public List<Product> getAvailableProducts() {
        return productRepository.findAvailableProducts();
    }
    
    // Update stock quantity
    public Product updateStockQuantity(Long id, Integer newQuantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }
        
        product.setStockQuantity(newQuantity);
        return productRepository.save(product);
    }
    
    // Check if product exists
    @Transactional(readOnly = true)
    public boolean productExists(Long id) {
        return productRepository.existsById(id);
    }
} 