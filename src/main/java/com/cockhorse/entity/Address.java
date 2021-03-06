package com.cockhorse.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    int base_areaid;
    String name;
    int parentid;
    int orders;
    List<Address> children = new ArrayList<>();

}
