package com.example.insurancesystem.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.dto.RuleForQuery;
import com.example.insurancesystem.entity.CheckInsurRule;
import com.example.insurancesystem.entity.CommissionRate;
import com.example.insurancesystem.service.ICheckInsurRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  核保规则控制器
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
    /**
     * 查询核保规则
     *
     * @param ruleForQuery    查询条件
     */
    @PostMapping("/queryInsurRule")
    public ResultInfo queryInsurRule(@RequestBody RuleForQuery ruleForQuery){
        return ResultInfo.success(checkInsurRuleService.queryInsurRule(ruleForQuery));
    }

    /**
     * 删掉核保规则
     *
     * @param id
     */
    @PostMapping("/deleteInsurRule")
    public ResultInfo deleteInsurance(@RequestParam(value = "id",required = true) String id){
        return ResultInfo.success(checkInsurRuleService.removeById(id));
    }
    /**
     * 新增或编辑费率
     *
     * @param checkInsurRule 要操作的规则
     */
    @PostMapping("/addOrUpdateInsurRate")
    public Object addOrUpdateInsurRate(@RequestBody CheckInsurRule checkInsurRule){
        return checkInsurRuleService.saveOrUpdate(checkInsurRule);
    }
}

