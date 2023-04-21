package com.example.insurancesystem.service.impl;

import cn.hutool.json.JSON;
import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.dto.InsuranceForQuery;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.entity.PaymentPeriod;
import com.example.insurancesystem.mapper.InsuranceMapper;
import com.example.insurancesystem.service.IInsuranceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;


/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@Service
public class InsuranceServiceImpl extends ServiceImpl<InsuranceMapper, Insurance> implements IInsuranceService {
    @Resource
    InsuranceMapper insuranceMapper;

    @Override
    public ResultInfo queryInsurance(InsuranceForQuery param) {
        List<Insurance> result = new ArrayList<>();
        QueryWrapper<Insurance> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("company_name", param.getCompanies());
        if(param.getInsurFullName() != null) {
            queryWrapper.eq("insur_full_name", param.getInsurFullName());
        }
        if(param.getCode() != null) {
            queryWrapper.eq("code", param.getCode());
        }
        if(param.getMainOrVice() != null) {
            queryWrapper.eq("main_or_vice", param.getMainOrVice());
        }
        if(param.getCode() != null) {
            queryWrapper.eq("param_diff_name", param.getParamDiffName());
        }
        if(param.getStartFrom() != null && param.getStartTo() != null) {
            queryWrapper.between("start_sale_time", param.getStartFrom(), param.getStartTo());
        }
        if(param.getEndFrom() != null && param.getEndTo() != null) {
            queryWrapper.between("stop_sale_time", param.getEndFrom(), param.getEndTo());
        }

        return ResultInfo.success(insuranceMapper.selectList(queryWrapper));
    }

    @Override
    public void exportBlank(List<Integer> indexes, String filePath) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Insurance Data");

        // Create header row
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < indexes.size(); i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(COLUMN_HEADERS[indexes.get(i)]);
        }
        // Write to file
        try (FileOutputStream fileOut = new FileOutputStream(filePath + "/险种信息空模版.xlsx")) {
            workbook.write(fileOut);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        workbook.close();
    }

    @Override
    public List<Insurance> imp(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        ExcelReader reader = ExcelUtil.getReader(inputStream);
//      通过 javabean的方式读取Excel内的对象，但是要求表头必须是英文，跟javabean的属性要对应起来\
        List<Insurance> list = reader.readAll(Insurance.class);
        //处理commonYear
        Workbook workbook = WorkbookFactory.create(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0); // assuming the data is in the first sheet
        int columnIdx = getColumnIndex(sheet, "commonYear"); // Get the column index based on the header
        if (columnIdx!= -1) {
            // Create a Gson instance
            Gson gson = new Gson();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) { // assuming the first row is the header
                Row row = sheet.getRow(i);
                String commonYearJson = row.getCell(columnIdx).getStringCellValue();

                // Define the Type of the List<PaymentPeriod>
                Type listType = new TypeToken<List<PaymentPeriod>>() {}.getType();

                // Use the fromJson() method to parse the JSON string and convert it to a list of PaymentPeriod objects
                List<PaymentPeriod> commonYear = gson.fromJson(commonYearJson, listType);
                list.get(i - 1).setCommonYear(commonYear);
            }
        }
        return list;
    }


    private static final String[] COLUMN_HEADERS = {"insurId", "companyName", "insurFullName", "insurShortName",
                "code", "mainOrVice", "paramDiffName", "insurType", "startSaleTime", "stopSaleTime",
                "remark", "commonYear"};

    // Helper method to retrieve column index based on header
    private int getColumnIndex(Sheet sheet, String header) {
        Row headerRow = sheet.getRow(0);
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            Cell cell = headerRow.getCell(i);
            if (cell.getStringCellValue().equalsIgnoreCase(header)) {
                return i;
            }
        }
        return -1; // return -1 if header not found
    }

}
