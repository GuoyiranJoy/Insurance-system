package com.example.insurancesystem.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.entity.CarInsuranceRate;
import com.example.insurancesystem.service.ICarInsuranceRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@RestController
@RequestMapping("/car-insurance-rate")
public class CarInsuranceRateController {
    @Autowired
    ICarInsuranceRateService carInsuranceRateService;

    @PostMapping("/queryCarInsuranceRate")
    public Object queryCarInsuranceRate(@RequestParam("companyNames") List<String> companyNames,
                                        @RequestParam("branchNames") List<String> branchNames,
                                        @RequestParam("rateName") String rateName){
        QueryWrapper<CarInsuranceRate> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("insurCompanyName", companyNames);
        queryWrapper.in("branch", branchNames);
        queryWrapper.like("rateName", rateName);
        return carInsuranceRateService.list(queryWrapper);
    }
}

