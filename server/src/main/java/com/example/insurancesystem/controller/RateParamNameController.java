package com.example.insurancesystem.controller;


import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.service.IRateParamNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  费率参数名称控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@RestController
@RequestMapping("/rate-param-name")
public class RateParamNameController {
    @Autowired
    IRateParamNameService rateParamNameService;
    /**
     * 获取所有费率参数名称
     */
    @GetMapping("/getRateParamName")
    public ResultInfo getParamTypeParam(){
        return ResultInfo.success(rateParamNameService.list());
    }
}

