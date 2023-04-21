package com.example.insurancesystem.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.entity.CarInsuranceRate;
import com.example.insurancesystem.service.ICarInsuranceRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  车险控制器
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
    /**
     * 查询车险费率
     *
     * @param companyNames    公司名
     * @param branchNames  分支机构名
     * @param rateName   费率名称
     */
    @PostMapping("/queryCarInsuranceRate")
    public ResultInfo queryCarInsuranceRate(@RequestParam(value="companyNames", required=false) List<String> companyNames,
                                        @RequestParam(value="branchNames", required=false) List<String> branchNames,
                                        @RequestParam(value="rateName", required=false) String rateName){
        return ResultInfo.success(carInsuranceRateService.queryCarInsuranceRate(companyNames, branchNames, rateName));
    }
    /**
     * 新增/编辑车险费率
     * @description 若id已存在则更新此条费率，否则新增
     * @param carInsuranceRate 要操作的保种费率
     */
    @PostMapping("/saveOrUpdateCarInsuranceRate")
    public ResultInfo saveOrUpdateCarInsuranceRate(@RequestBody CarInsuranceRate carInsuranceRate){

        return ResultInfo.success(carInsuranceRateService.saveOrUpdate(carInsuranceRate));
    }

    /**
     * 审核车险费率
     * @param id 险种费率的序号
     */
    @PostMapping("/checkCarInsuranceRate")
    public ResultInfo checkCarInsuranceRate(@RequestParam(value = "id",required = true) int id){
        CarInsuranceRate carInsuranceRate = carInsuranceRateService.getById(id);
        carInsuranceRate.setIsChecked(true);
        return ResultInfo.success(carInsuranceRateService.saveOrUpdate(carInsuranceRate));
    }
}

