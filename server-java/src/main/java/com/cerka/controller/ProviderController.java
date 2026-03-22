package com.cerka.controller;

import com.cerka.model.Provider;
import com.cerka.repository.ProviderRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    private final ProviderRepository providerRepo;

    public ProviderController(ProviderRepository providerRepo) {
        this.providerRepo = providerRepo;
    }

    @GetMapping
    public List<Provider> getAll() {
        return providerRepo.findAll();
    }

    @GetMapping("/{id}")
    public Provider getById(@PathVariable int id) {
        return providerRepo.findById(id);
    }
}