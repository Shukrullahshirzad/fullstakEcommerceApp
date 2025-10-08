package com.shirzad.ecom_proj.controller;

import com.shirzad.ecom_proj.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ProductController {

    @GetMapping("/")
    public String greeting(){
        return "Hello World";
    }
    public List<Product> getProducts(){

    }
}
