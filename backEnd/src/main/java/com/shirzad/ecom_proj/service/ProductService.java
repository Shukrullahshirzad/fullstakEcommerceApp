package com.shirzad.ecom_proj.service;

import com.shirzad.ecom_proj.model.Product;
import com.shirzad.ecom_proj.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public  List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
