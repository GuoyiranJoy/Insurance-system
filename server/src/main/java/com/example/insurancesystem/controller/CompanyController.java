package com.example.insurancesystem.controller;


import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.entity.Company;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.service.ICompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * <p>
 *  公司控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@RestController
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    ICompanyService companyService;
    /**
     * 获取所有公司名
     *
     */
    @GetMapping("/getAllCompanyNames")
    public ResultInfo getAllCompanyNames(){
        return ResultInfo.success(companyService.list());
    }

}

