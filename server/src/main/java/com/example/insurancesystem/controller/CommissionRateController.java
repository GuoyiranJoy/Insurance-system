package com.example.insurancesystem.controller;


import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.entity.CommissionRate;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.service.ICommissionRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.List;

/**
 * <p>
 *  核佣费率控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@RestController
@RequestMapping("/commission-rate")
public class CommissionRateController {
    @Autowired
    ICommissionRateService commissionRateService;
    /**
     * 查询某险种的核佣费率列表
     *
     * @param insurId 险种id
     */
    @PostMapping("/queryInsurRate")
    public ResultInfo queryInsurRate(@RequestParam(value = "insurId",required = true) int insurId){

        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("insur_id", insurId);
        return ResultInfo.success(commissionRateService.list(queryWrapper));

    }
    /**
     * 移除某条核佣费率
     *
     * @param rateId 费率id
     */
    @PostMapping("/deleteInsurRate")
    public ResultInfo deleteInsurRate(@RequestParam(value = "rateId",required = true) int rateId){

        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("rate_id", rateId);
        return ResultInfo.success(commissionRateService.remove(queryWrapper));

    }
    /**
     * 新增或编辑核佣费率
     *
     * @param commissionRate 核佣费率
     */
    @PostMapping("/addOrUpdateInsurRate")
    public ResultInfo addOrUpdateInsurRate(@RequestBody CommissionRate commissionRate){

        return ResultInfo.success(commissionRateService.saveOrUpdate(commissionRate));
    }

    /**
     * 导出接口
     */
    @GetMapping("/export")
    public void export(HttpServletResponse response) throws Exception {
        // 从数据库查询出所有的数据
        List<CommissionRate> list = commissionRateService.list();
        // 在内存操作，写出到浏览器
        ExcelWriter writer = ExcelUtil.getWriter(true);
        // 一次性写出list内的对象到excel，使用默认样式，强制输出标题
        writer.write(list, true);
        // 设置浏览器响应的格式
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("导出费率Excel", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");
        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }
}

