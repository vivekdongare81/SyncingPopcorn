package com.devsoncall.syncingpopcorn.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsoncall.syncingpopcorn.entity.AppUser;
import com.devsoncall.syncingpopcorn.repository.UserRepository;
import com.devsoncall.syncingpopcorn.service.UserService;

@Service
public class UserServiceImpl implements UserService {

  @Autowired 
  UserRepository userRepository;

  public AppUser saveUser(AppUser appUser) {
    return userRepository.save(appUser);
  }

  public List<AppUser> findAllUsers(List<String> list) {
    return userRepository.findAllById(list);
  }

  public void updateName(String user_ID, String name) {
    userRepository.updateName(user_ID, name);
  }

  public Optional<AppUser> findUserById(String user_ID) {
    return userRepository.findById(user_ID);
  }

  @Override
  public void updateHostStatus(String user_ID, boolean isUserHost) {
    userRepository.updateHostStatus(user_ID, isUserHost);
  }

  public AppUser getSpecificUser(String user_ID) {
    return userRepository.getSpecificUser(user_ID);
  }

  public void removeUser(String user_ID) {
    userRepository.deleteById(user_ID);
  }
}
