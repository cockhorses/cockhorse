package com.cockhorse.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Menu implements Serializable {

    private Integer id;
    private Integer pid;
    private String title;
    private String href;
    private Boolean spread;
    private String target;
    private String icon;
    private Integer available;

}
