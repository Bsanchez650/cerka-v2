package com.cerka.model;

import java.math.BigDecimal;

public class Provider {
    private int id;
    private String businessName;
    private BigDecimal avgRating;
    private int totalReviews;
    private String name;
    private String avatarUrl;
    private String bio;
    private String instagramHandle;
    private boolean acceptsWalkins;

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getBusinessName(){
        return businessName;
    }

    public void setBusinessName(String businessName){
        this.businessName = businessName;
    }

    public BigDecimal getAvgRating(){
        return avgRating;
    }
    
    public void setAvgRating(BigDecimal avgRating){
        this.avgRating = avgRating;
    }

    public int totalReviews(){
        return totalReviews;
    }

    public void setTotalReviews(int totalReviews){
        this.totalReviews = totalReviews;
    }

    public String getName(){
        return name; 
    }
    
    public void setName(String name){
        this.name = name;
    }

    public String getAvatarUrl(){
        return avatarUrl;
    }
    
    public void setAvatarUrl(String avatarUrl){
        this.avatarUrl = avatarUrl;
    }

    public String getBio(){
        return bio;}
    public void setBio(String bio){
        this.bio = bio;
    }

    public String getInstagramHandle(){
        return instagramHandle;
    }
    public void setInstagramHandle(String instagramHandle){
        this.instagramHandle = instagramHandle;
    }

    public boolean isAcceptsWalkins(){
        return acceptsWalkins;
    }
    
    public void setAcceptsWalkins(boolean acceptsWalkins){
        this.acceptsWalkins = acceptsWalkins;
    }



}
