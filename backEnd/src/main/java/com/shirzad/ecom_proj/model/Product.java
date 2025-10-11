package com.shirzad.ecom_proj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity // This annotation specifies that the class is an entity and is mapped to a database table.
@Data // This annotation generates getters, setters, toString, equals, and hashCode methods.
@AllArgsConstructor // This annotation generates a constructor with a parameter for each field in the class.
@NoArgsConstructor // This annotation generates a no-argument constructor.
public class Product {
    @Id // This annotation specifies the primary key of an entity.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This annotation provides for the specification of generation strategies for the values of primary keys.
    private Integer productId;
    private String name;
    private double price;
    private String brand;
    private String description;
    private String category;
    private Date releaseDate;
    private boolean available;
    private int stockQuantity;
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageDate;


}
