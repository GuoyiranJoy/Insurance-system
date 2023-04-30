package com.example.insurancesystem;

import io.github.yedaxia.apidocs.Docs;
import io.github.yedaxia.apidocs.DocsConfig;
import io.github.yedaxia.apidocs.plugin.markdown.MarkdownDocPlugin;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InsuranceSystemApplication {

	public static void main(String[] args) {

		SpringApplication.run(InsuranceSystemApplication.class, args);
		DocsConfig config = new DocsConfig();
		config.setProjectPath("/Users/bytedance/Documents/GraduationProject/Insurance-system/server/src/main/java/com/example/insurancesystem"); // 项目根目录
		config.setProjectName("insuranceSystem"); // 项目名称
		config.setApiVersion("V1.0");       // 声明该API的版本
		config.setDocsPath("/Users/bytedance/Documents/GraduationProject/Insurance-system/server/JAPI"); // 生成API 文档所在目录
		config.setAutoGenerate(Boolean.TRUE);  // 配置自动生成
		config.addPlugin(new MarkdownDocPlugin());
		Docs.buildHtmlDocs(config); // 执行生成文档
	}

}
