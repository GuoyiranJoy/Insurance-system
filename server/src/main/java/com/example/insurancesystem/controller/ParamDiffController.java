package com.example.insurancesystem.controller;


import com.example.insurancesystem.service.IParamDiffService;
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
@RequestMapping("/param-diff")
public class ParamDiffController {

    IParamDiffService paramDiffService;
        //费率参数
    @GetMapping("/getParamDiff")
    public Object getParamTypeParam(){
        return paramDiffService.list();
    }

}

