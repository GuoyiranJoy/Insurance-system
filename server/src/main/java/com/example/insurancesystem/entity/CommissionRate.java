package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@ApiModel(value = "CommissionRate对象", description = "")
public class CommissionRate implements Serializable {

    private static final long serialVersionUID = 1L;
    @TableId(value = "rate_id", type = IdType.AUTO)
    //非必填
      private Integer rateId;

    private Integer insurId;

    private String rateParamName;

    private String inOut;

    private Integer yearPeriodStart;

    private Integer yearPeriodEnd;

    private LocalDate validateDateStart;

    private LocalDate validateDateEnd;
    @TableField(typeHandler = FastjsonTypeHandler.class)
    private List<ParamRate> paramRateList;
    //是否计入FYC，非必填
    private Boolean inFyc;
    //参数说明，非必填
    private String paramDescription;


}
