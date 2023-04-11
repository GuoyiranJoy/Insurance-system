package com.example.insurancesystem.controller;


import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.entity.Company;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.service.ICompanyService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedList;
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
@RequestMapping("/company")
public class CompanyController {
    ICompanyService companyService;

    @GetMapping("/getCompanyNames")
    public Object getCompanyNames(){

        return companyService.list();

    }

    @GetMapping("/getBranchNames")
    public Object getBranchNames(@RequestParam("companyId") List<String> companyIds){
        QueryWrapper<Company> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("companyId", companyIds);
        List<Company> companies = companyService.list(queryWrapper);
        List<String> branches = new ArrayList<>();
        for (Company company : companies
             ) {
            branches.add(company.getBranchList());
        }
        return branches;
    }

}

