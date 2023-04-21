package com.example.insurancesystem.controller;


import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.dto.InsuranceForQuery;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.service.IInsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;


/**
 * <p>
 *  险种控制器
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

    /**
     * 查询某条险种
     *
     * @param param    传入险种查询信息
     * @return 查询结果
     */
    @PostMapping("/queryInsurance")
    public ResultInfo queryInsurance(@RequestBody InsuranceForQuery param){

        return insuranceService.queryInsurance(param);

    }
    /**
     * 删掉险种
     *
     * @param id    险种id
     * @return 查询结果
     */
    @PostMapping("/deleteInsurance")
    public ResultInfo deleteInsurance(@RequestParam(value = "id",required = true) String id){

        return ResultInfo.success(insuranceService.removeById(id));
    }
    /**
     * 新增一笔
     *
     * @param info    某条保险
     * @return 查询结果
     */
    @PostMapping("/addInsurance")
    public ResultInfo addInsurance(@RequestBody Insurance info){

        return ResultInfo.success(insuranceService.saveOrUpdate(info));

    }

    /**
     * 编辑险种
     *
     * @param info    某条保险
     * @return 查询结果
     */
    @PostMapping("/updateInsurance")
    public ResultInfo updateInsurance(@RequestBody Insurance info){

        return ResultInfo.success(insuranceService.updateById(info));

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
//        writer.write(null);
        // 设置浏览器响应的格式
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("导出险种Excel", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");
        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }
    /**
     * 生成导入空模板
     * @description
     * @param indexes 包含的字段序号，对应数组 {"insurId", "companyName", "insurFullName", "insurShortName",
     *      *                 "code", "mainOrVice", "paramDiffName", "insurType", "startSaleTime", "stopSaleTime",
     *      *                 "remark", "commonYear"};
     * @param  filePath 文件保存路径
     */
    @GetMapping("/exportBlank")
    public void exportBlank(@RequestParam(value = "indexes",required = true) List<Integer> indexes, @RequestParam(value = "filePath",required = true) String filePath) throws IOException {
        insuranceService.exportBlank(indexes, filePath);
    }
    /**
     * 导入（批量新增）
     * @param file 要导入的文件，必填
     */
    @PostMapping("/import")
    public ResultInfo imp(MultipartFile file) throws Exception {
        return ResultInfo.success(insuranceService.saveOrUpdateBatch(insuranceService.imp(file)));
    }

}

