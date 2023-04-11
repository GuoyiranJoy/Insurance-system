package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
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
@TableName("car_insurance_rate")
@ApiModel(value = "CarInsuranceRate对象", description = "")
public class CarInsuranceRate implements Serializable {

    private static final long serialVersionUID = 1L;

      @TableId(value = "car_insur_id", type = IdType.AUTO)
    private Integer carInsurId;

    private String rateName;

    private String insurCompanyName;

    private String insurTypeName;

    @ApiModelProperty("车辆类型")
    private String vehicleType;

    private String branch;

    private LocalDateTime insurStarttime;

    private LocalDateTime insurEndtime;

    @ApiModelProperty("进项")
    private Integer commissionRateIn;

    @ApiModelProperty("支项")
    private Integer commissionRateOut;

    @ApiModelProperty("是否审核")
    private Boolean isChecked;


}
