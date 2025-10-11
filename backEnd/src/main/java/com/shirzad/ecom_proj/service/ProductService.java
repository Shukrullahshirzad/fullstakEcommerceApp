package com.shirzad.ecom_proj.service;

import com.shirzad.ecom_proj.model.Product;
import com.shirzad.ecom_proj.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public  List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(1).orElse(new Product());
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename()); // this will 
        product.setImageType(imageFile.getContentType());
        product.setImageDate(imageFile.getBytes());
        return productRepository.save(product);
    }
}
