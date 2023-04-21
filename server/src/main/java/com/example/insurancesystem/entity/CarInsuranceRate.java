package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@Getter
@Setter
@TableName(autoResultMap = true)
@ApiModel(value = "CarInsuranceRate对象", description = "")
public class CarInsuranceRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "car_insur_id", type = IdType.AUTO)
    //非必填
    private Integer carInsurId;

    private String rateName;
    @TableField(typeHandler = FastjsonTypeHandler.class)

    private List<String> companyNameList;

    private String insurTypeName;

    @ApiModelProperty("车辆类型")
    private String vehicleType;
    @TableField(typeHandler = FastjsonTypeHandler.class)

    private List<String> branchNameList;

    private LocalDate insurStarttime;

    private LocalDate insurEndtime;

    @ApiModelProperty("进项")
    private double commissionRateIn;

    @ApiModelProperty("支项")
    private double commissionRateOut;

    @ApiModelProperty("是否审核")
    private Boolean isChecked;


}
