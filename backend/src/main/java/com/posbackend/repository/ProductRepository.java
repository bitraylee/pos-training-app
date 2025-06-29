package com.posbackend.repository;

import com.posbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find by name (case-insensitive)
    Optional<Product> findByNameIgnoreCase(String name);
    
    // Find products by price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find products with low stock (less than specified quantity)
    List<Product> findByStockQuantityLessThan(Integer quantity);
    
    // Find products by name containing (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Custom query to find products with price greater than
    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> findProductsWithPriceGreaterThan(@Param("price") BigDecimal price);
    
    // Custom query to find products with stock quantity greater than 0
    @Query("SELECT p FROM Product p WHERE p.stockQuantity > 0")
    List<Product> findAvailableProducts();
    
    // Check if product exists by name
    boolean existsByNameIgnoreCase(String name);
} 