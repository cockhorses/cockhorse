package com.cockhorse.entity;

import java.util.ArrayList;
import java.util.List;

public class Address {

    int base_areaid;
    String name;
    int parentid;
    int orders;
    List<Address> children = new ArrayList<>();

    @Override
    public String toString() {
        return "Address{" +
                "base_areaid=" + base_areaid +
                ", name='" + name + '\'' +
                ", parentid=" + parentid +
                ", orders=" + orders +
                ", children=" + children +
                '}';
    }

    public int getBase_areaid() {
        return base_areaid;
    }

    public void setBase_areaid(int base_areaid) {
        this.base_areaid = base_areaid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentid() {
        return parentid;
    }

    public void setParentid(int parentid) {
        this.parentid = parentid;
    }

    public int getOrders() {
        return orders;
    }

    public void setOrders(int orders) {
        this.orders = orders;
    }

    public List<Address> getChildren() {
        return children;
    }

    public void setChildren(List<Address> children) {
        this.children = children;
    }
}
