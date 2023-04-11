package com.example.insurancesystem.controller;


import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.dto.InsuranceForQuery;
import com.example.insurancesystem.entity.CommissionRate;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.mapper.CommissionRateMapper;
import com.example.insurancesystem.service.ICarInsuranceRateService;
import com.example.insurancesystem.service.ICheckInsurRuleService;
import com.example.insurancesystem.service.ICommissionRateService;
import com.example.insurancesystem.service.IInsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@RestController
@RequestMapping("/insurance")
//模块 1 代理险种费用率
public class InsuranceController {
    @Autowired
    IInsuranceService insuranceService;

    //查询某条险种
    @PostMapping("/queryInsurance")
    public Object queryInsurance(@RequestBody InsuranceForQuery param){

        return insuranceService.queryInsurance(param);

    }

    //删掉险种
    @PostMapping("/deleteInsurance")
    public Object deleteInsurance(@RequestParam("id") String id){

        return insuranceService.removeById(id);
    }

    //新增一笔
    @PostMapping("/addInsurance")
    public Object addInsurance(@RequestBody Insurance info){

        return insuranceService.saveOrUpdate(info);

    }

    //编辑险种
    @PostMapping("/updateInsurance")
    public Object updateInsurance(@RequestBody Insurance info){

        return insuranceService.updateById(info);

    }

    /**
     * 导出接口
     */
    @GetMapping("/export")
    public void export(HttpServletResponse response) throws Exception {
        // 从数据库查询出所有的数据
        List<Insurance> list = insuranceService.list();
        // 在内存操作，写出到浏览器
        ExcelWriter writer = ExcelUtil.getWriter(true);
        // 一次性写出list内的对象到excel，使用默认样式，强制输出标题
        writer.write(list, true);
        // 设置浏览器响应的格式
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("导出险种Excel", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");
        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }


}

