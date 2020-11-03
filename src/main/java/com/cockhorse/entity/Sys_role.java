package com.cockhorse.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sys_role {

    int id;
    String name;
    String roledesc;
    int available;
}
