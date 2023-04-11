package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
@ApiModel(value = "Insurance对象", description = "")
public class Insurance implements Serializable {

    private static final long serialVersionUID = 1L;

      @TableId(value = "insur_id", type = IdType.AUTO)
    private Integer insurId;

    private String companyName;

    private String insurFullName;

    private String insurShortName;

    private String code;

    @ApiModelProperty("主附约")
    private String mainOrVice;

    @ApiModelProperty("参数区别")
    private String paramDiffName;

    @ApiModelProperty("险种类别")
    private String insurType;

    private LocalDateTime startSaleTime;

    private LocalDateTime stopSaleTime;

    private String remark;

    @ApiModelProperty("交费年期")
    private String commonYear;


}
