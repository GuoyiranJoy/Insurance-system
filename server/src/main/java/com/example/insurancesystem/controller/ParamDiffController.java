package com.example.insurancesystem.controller;


import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.service.IParamDiffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  参数区别控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@RestController
@RequestMapping("/param-diff")
public class ParamDiffController {

    @Autowired
    IParamDiffService paramDiffService;
    /**
     * 获取所有参数区别
     */
        //费率参数
    @GetMapping("/getParamDiff")
    public ResultInfo getParamTypeParam(){
        return ResultInfo.success(paramDiffService.list());
    }

}

