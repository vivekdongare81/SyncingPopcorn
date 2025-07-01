package com.devsoncall.syncingpopcorn.service;

import java.util.List;
import java.util.Optional;

import com.devsoncall.syncingpopcorn.entity.AppUser;

public interface UserService {

  AppUser saveUser(AppUser appUser);

  Optional<AppUser> findUserById(String user_ID);

  List<AppUser> findAllUsers(List<String> list);

  void updateName(String user_ID, String name);

  public void updateHostStatus(String user_ID, boolean isUserHost);

  AppUser getSpecificUser(String user_ID);

  void removeUser(String user_ID);
}
