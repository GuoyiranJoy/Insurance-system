package com.example.insurancesystem.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.entity.CheckInsurRule;
import com.example.insurancesystem.entity.CommissionRate;
import com.example.insurancesystem.service.ICheckInsurRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@RestController
@RequestMapping("/check-insur-rule")
public class CheckInsurRuleController {
    //模块 2 核保规则管理
    @Autowired
    ICheckInsurRuleService checkInsurRuleService;

    //查询
    @PostMapping("/queryInsurRule")
    public Object queryInsurRule(@RequestParam("companyNames") List<String> companyNames,
                                 @RequestParam("branchNames") List<String> branchNames,
                                 @RequestParam("dateFrom") String from,
                                 @RequestParam("dateTo") String to,
                                 @RequestParam("title") String name){
        return checkInsurRuleService.queryInsurRule(companyNames,branchNames,from,to,name);
    }

    //删掉
    @PostMapping("/deleteInsurRule")
    public Object deleteInsurance(@RequestParam("id") String id){
        return checkInsurRuleService.removeById(id);
    }

    //新增或编辑费率
    @PostMapping("/addOrUpdateInsurRate")
    public Object addOrUpdateInsurRate(@RequestBody CheckInsurRule checkInsurRule){
        return checkInsurRuleService.saveOrUpdate(checkInsurRule);
    }
}

