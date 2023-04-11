package com.example.insurancesystem.controller;


import com.example.insurancesystem.service.IParamDiffService;
import com.example.insurancesystem.service.IRateParamNameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@RestController
@RequestMapping("/rate-param-name")
public class RateParamNameController {
    IRateParamNameService rateParamNameService;
    //费率参数
    @GetMapping("/getRateParamName")
    public Object getParamTypeParam(){
        return rateParamNameService.list();
    }
}

