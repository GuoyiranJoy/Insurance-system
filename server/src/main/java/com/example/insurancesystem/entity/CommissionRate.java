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
@TableName("commission_rate")
@ApiModel(value = "CommissionRate对象", description = "")
public class CommissionRate implements Serializable {

    private static final long serialVersionUID = 1L;
    @TableId(value = "rate_id", type = IdType.AUTO)
      private Integer rateId;

    private Integer insurId;

    private String rateParamName;

    private String inOut;

    private Integer yearPeriodStart;

    private Integer yearPeriodEnd;

    private LocalDateTime validateDateStart;

    private LocalDateTime validateDateEnd;

    private String paramRateList;

    private Boolean inFyc;

    private String paramDescription;


}
