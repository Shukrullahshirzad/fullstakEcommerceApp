package com.shirzad.ecom_proj.controller;

import com.shirzad.ecom_proj.model.Product;
import com.shirzad.ecom_proj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin

// allow requests from any origin. if not specified, it allows all origins by default. default origin means the domain from which the request is made.
// here the defult origin is http://localhost:8080 for backend and http://localhost:5173 for frontend.
// You can specify origins like @CrossOrigin(origins = "http://example.com")

@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public String greeting(){
        
        return "Hello World";
    }
    
    @GetMapping("/products")
    public List<Product> getProducts(){

        return productService.getAllProducts();
    }

    @GetMapping("product/{id}")
    public Product getProductById(Integer id){

        return productService.getProductById(id);
    }

    public ResponseEntity<?> addProduct(@RequestPart Product product,
                                        @RequestPart MultipartFile imageFile){
        try{

        productService.addProduct(product, imageFile);
        return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    
}
