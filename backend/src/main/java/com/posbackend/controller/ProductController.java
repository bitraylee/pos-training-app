package com.posbackend.controller;

import com.posbackend.dto.ProductDto;
import com.posbackend.exception.DuplicateProductException;
import com.posbackend.exception.ProductNotFoundException;
import com.posbackend.model.Product;
import com.posbackend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // For development - configure properly for production
public class ProductController {
    
    private final ProductService productService;
    
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    // CREATE - POST /api/products
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto productDto) {
        try {
            Product product = convertToEntity(productDto);
            Product savedProduct = productService.createProduct(product);
            ProductDto savedProductDto = convertToDto(savedProduct);
            return new ResponseEntity<>(savedProductDto, HttpStatus.CREATED);
        } catch (DuplicateProductException e) {
            throw e;
        }
    }
    
    // READ ALL - GET /api/products
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }
    
    // READ BY ID - GET /api/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        ProductDto productDto = convertToDto(product);
        return ResponseEntity.ok(productDto);
    }
    
    // READ BY NAME - GET /api/products/search?name={name}
    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProductsByName(@RequestParam String name) {
        List<Product> products = productService.searchProductsByName(name);
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }
    
    // READ BY PRICE RANGE - GET /api/products/price-range?min={min}&max={max}
    @GetMapping("/price-range")
    public ResponseEntity<List<ProductDto>> getProductsByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        List<Product> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }
    
    // READ AVAILABLE PRODUCTS - GET /api/products/available
    @GetMapping("/available")
    public ResponseEntity<List<ProductDto>> getAvailableProducts() {
        List<Product> products = productService.getAvailableProducts();
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }
    
    // READ LOW STOCK PRODUCTS - GET /api/products/low-stock?threshold={threshold}
    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductDto>> getProductsWithLowStock(@RequestParam(defaultValue = "10") Integer threshold) {
        List<Product> products = productService.getProductsWithLowStock(threshold);
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }
    
    // UPDATE - PUT /api/products/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDto productDto) {
        try {
            Product product = convertToEntity(productDto);
            Product updatedProduct = productService.updateProduct(id, product);
            ProductDto updatedProductDto = convertToDto(updatedProduct);
            return ResponseEntity.ok(updatedProductDto);
        } catch (ProductNotFoundException e) {
            throw e;
        } catch (DuplicateProductException e) {
            throw e;
        }
    }
    
    // UPDATE STOCK QUANTITY - PATCH /api/products/{id}/stock
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductDto> updateStockQuantity(
            @PathVariable Long id,
            @RequestParam Integer quantity) {
        Product updatedProduct = productService.updateStockQuantity(id, quantity);
        ProductDto updatedProductDto = convertToDto(updatedProduct);
        return ResponseEntity.ok(updatedProductDto);
    }
    
    // DELETE - DELETE /api/products/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    
    // Helper methods to convert between Entity and DTO
    private Product convertToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStockQuantity(productDto.getStockQuantity());
        return product;
    }
    
    private ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStockQuantity(product.getStockQuantity());
        productDto.setCreatedAt(product.getCreatedAt());
        productDto.setUpdatedAt(product.getUpdatedAt());
        return productDto;
    }
} 