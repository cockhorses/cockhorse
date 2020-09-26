package com.cockhorse.entity;

public class Pictures {

    int pid;
    String path;

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Pictures{" +
                "pid=" + pid +
                ", path='" + path + '\'' +
                '}';
    }
}
