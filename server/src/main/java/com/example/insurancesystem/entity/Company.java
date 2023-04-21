package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
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
@ApiModel(value = "Company对象", description = "")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

      @TableId(value = "company_id", type = IdType.AUTO)
    private Integer companyId;

    private String companyName;

}
