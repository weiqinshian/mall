package com.mmall.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by XW
 */
public interface IFileService {

    String upload(MultipartFile file, String path);
}
