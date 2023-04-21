package com.example.insurancesystem.controller;


import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.service.IBranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  分支机构控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-12
 */
@RestController
@RequestMapping("/branch")
public class BranchController {
    @Autowired
    IBranchService branchService;

    /**
     * 获取所有分支机构
     */
    @GetMapping("/getAllBranchNames")
    public ResultInfo getAllBranchNames(){
        return ResultInfo.success(branchService.list());
    }
}

