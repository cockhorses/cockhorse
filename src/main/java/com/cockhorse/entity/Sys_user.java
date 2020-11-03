package com.cockhorse.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sys_user {

    int id;
    String loginname;
    String loginpwd;
    String realname;
    String card;
    int sex;
    String address;
    String phone;
    String position;
    int available;
    String salt;
    int pid;
    String path;


}
