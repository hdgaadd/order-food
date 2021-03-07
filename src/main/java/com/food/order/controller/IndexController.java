package com.food.order.controller;

import com.food.order.model.MsgVo;
import com.food.order.model.config.Config;
import com.food.order.model.criteria.Criteria;
import com.food.order.model.criteria.Restrictions;
import com.food.order.model.entity.*;
import com.food.order.model.repository.*;
import com.food.order.model.service.PluginsServiceImpl;
import com.food.order.plugins.PluginsService;
import com.food.order.plugins.oauth.OauthService;
import com.food.order.plugins.oauth.OauthUtil;
import com.food.order.plugins.pay.PayUtil;
import com.food.order.plugins.pay.PaymentService;
import com.food.order.utils.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class IndexController extends BaseController{

    @Autowired
    ConsumerRepository consumerRepository;
    @Autowired
    TablesRepository tablesRepository;
    @Autowired
    OauthConfigRepository oauthConfigRepository;
    @Autowired
    PaymentsConfigRepository paymentsConfigRepository;
    @Autowired
    TmpCacheRepository tmpCacheRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    OauthUserRepository oauthUserRepository;


    @GetMapping("/google6ec349d68403e60b.html")
    public String goodsSearch(){
        return "google6ec349d68403e60b";
    }

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/table/{uuid}")
    public String goPage(@PathVariable("uuid")String uuid,
                        HttpSession session,
                        HashMap<String, Object> map) {
        Criteria<Tables> tablesCriteria = new Criteria<>();
        tablesCriteria.add(Restrictions.eq("uuid",uuid));
        Tables tables = tablesRepository.findOne(tablesCriteria).orElse(null);
        if(tables == null){
            //TODO 错误页面
            map.put("msg","餐桌不存在001");
            return "error";
        }
        Store store = tables.getStore();
        //TODO 判断是否要登录

        String usedMainConfigMsg = "";
        if(store.getConfigType() == 1) {//统一使用店家
            usedMainConfigMsg = "(使用的总部配置)";
        }
        String token = null;

        //检测登录配置
        Criteria<OauthConfig> oauthConfigCriteria = new Criteria<>();
        if(store.getConfigType() == 1){//统一使用店家
            oauthConfigCriteria.add(Restrictions.eq("mainStore",store.getMainStore()));
        }else if(store.getConfigType() == 2){//使用分店
            oauthConfigCriteria.add(Restrictions.eq("store",store));
        }
        oauthConfigCriteria.add(Restrictions.eq("status",2));
        List<OauthConfig> oauthConfigs = oauthConfigRepository.findAll(oauthConfigCriteria);

        //已经登录进行验证登录情况
        token = (String)session.getAttribute("token");
        if(token != null && !token.equals("")){//有token,要对token的合法性进行检测
            TmpCache tmpCache = tmpCacheRepository.findOneByCKey(token);
            if(tmpCache == null || tmpCache.getEndTime() < System.currentTimeMillis()){//过期了
                token = null;
            }else{
                User user =  userRepository.findById(Long.parseLong(tmpCache.getCValue())).orElse(null);
                if(user == null || user.isDelete() || user.getBelong() != 5){//非有效用户
                    token = null;
                }
            }
            if(token != null){
                tmpCache.setEndTime(tmpCache.getEndTime()+tmpCache.getExpireTime());//延长有效期
                tmpCacheRepository.save(tmpCache);
            }
        }
        //TODO 有多个登录配置时，让用户选择
        if(store.getPayConfig() == 1){//预付费机制的需要在线支付,必须强制授权登录

            //TODO 判断是否是微信浏览器
            if(token == null || token.equals("")) {//未登录，进行登录
                if(oauthConfigs.size() == 0){
                    //TODO 登录配置出错页面
                    map.put("msg","预付费模式下，登录配置不正确"+usedMainConfigMsg+",请联系管理员002");
                    return "error";
                }
//                if(oauthConfigs.size() > 1){
//
//                }
                //检测该插件是否合法
                OauthConfig oauthConfig = oauthConfigs.get(0);
                OauthService oauthService = new OauthUtil().getOauthClass(oauthConfig,Config.host);

                PluginsService pluginsService = (PluginsService)oauthService;
                MsgVo msgVo = pluginsServiceImpl.checkPlugins(null,store,pluginsService.getPluginsTag());
                if(msgVo.getCode() != 0){
                    map.put("msg",""+pluginsService.getName()+":"+msgVo.getMsg()+"005");
                    return "error";
                }
                session.setAttribute("callback_url",Config.host + "/table/"+uuid);
                return "redirect:"+oauthService.getConsumerOauthUrl();//跳转到授权页面
            }
        }else{//后付费的，可以不用授权配置
            if(token == null || token.equals("")) {//未登录，进行登录
                if (oauthConfigs.size() == 0) {//没有有效授权配置时，使用临时用户
                    Criteria<Consumer> consumerCriteria = new Criteria<>();
                    consumerCriteria.add(Restrictions.eq("wxOpenId", "-1"));
                    consumerCriteria.add(Restrictions.eq("store", tables.getStore()));
                    Consumer consumer = consumerRepository.findOne(consumerCriteria).orElse(null);
                    if (consumer == null) {
                        consumer = new Consumer();
                        consumer.setMainStore(tables.getStore().getMainStore());
                        consumer.setStore(tables.getStore());
                        consumer.setUser(tables.getStore().getUser());//其实就是店家自己
                        consumer.setWxOpenId("-1");
                        consumer.setName("管理员");
                        consumer.setNickName("临时点餐用户");
                        consumerRepository.save(consumer);
                    }
                    removeToken(consumer.getUser());
                    saveToken("consumer", consumer.getUser(), 1);
                    token = consumer.getUser().getAccessToken();
                }else{//有授权配置时，使用授权配置
                    OauthConfig oauthConfig = oauthConfigs.get(0);
                    oauthConfig.setStore(tables.getStore());
                    OauthService oauthService = new OauthUtil().getOauthClass(oauthConfig,Config.host);
                    session.setAttribute("callback_url",Config.host + "/table/"+uuid);
                    return "redirect:"+oauthService.getConsumerOauthUrl();//跳转到授权页面
                }
            }
        }
        //TODO 判断是否关注

        TmpCache tmpCache = tmpCacheRepository.findOneByCKey(token);
        User user =  userRepository.findById(Long.parseLong(tmpCache.getCValue())).orElse(null);
        Criteria<Consumer> criteria = new Criteria<>();
        criteria.add(Restrictions.eq("user",user));
        Consumer consumer = consumerRepository.findOne(criteria).orElse(null);
        if(consumer.getWxOpenId() == null || !consumer.getWxOpenId().equals("-1")) {//在有授权配置时进行检测
            // 通过当前登录的帐号判断用哪种支付
            Criteria<OauthUser> oauthUserCriteria = new Criteria<>();
            oauthUserCriteria.add(Restrictions.eq("user", consumer.getUser()));
            OauthUser oauthUser = oauthUserRepository.findOne(oauthUserCriteria).orElse(null);//
            if (oauthUser == null && store.getPayConfig() == 1) {

                map.put("msg", "预付费模式下用户登录授权配置不正确"+usedMainConfigMsg+"003");
                return "error";
            } else {
                if(oauthUser != null) {
                    List<String> tag = new PayUtil().getTagsByOauthTag(oauthUser.getTag());
                    Criteria<PaymentsConfig> paymentsConfigCriteria = new Criteria<>();
                    if (consumer.getStore().getConfigType() == 1) {//使用总部的统一配置
                        paymentsConfigCriteria.add(Restrictions.eq("mainStore", consumer.getStore().getMainStore()));
                    } else {
                        paymentsConfigCriteria.add(Restrictions.eq("store", consumer.getStore()));
                    }
                    paymentsConfigCriteria.add(Restrictions.in("tag", tag));
                    List<PaymentsConfig> paymentsConfigs = paymentsConfigRepository.findAll(paymentsConfigCriteria);
                    if (paymentsConfigs.size() == 0 && store.getPayConfig() == 1) {
                        List<PaymentService> paymentServices =  new PayUtil().getPaymentClass(oauthUser.getTag());
                        if(paymentServices.size() == 0){
                            map.put("msg", "预计付费模式下，没有对应的授权插件"+usedMainConfigMsg+"005");
                            return "error";
                        }
                        PluginsService pluginsService = (PluginsService)paymentServices.get(0);
                        map.put("msg", "预计付费模式下，" + pluginsService.getName() + "的授权方式没有对应的支付配置"+usedMainConfigMsg+"004");
                        return "error";
                    }
                }
            }
        }

        //检查是否有指定的页面
        Map<String,String> params = new HashMap<>();
        params.put("token",""+token);
        params.put("table_id",""+tables.getId());
        params.put("t",""+System.currentTimeMillis());
        String url = getPageViewUrl(tables.getStore(),"",params);
        return "redirect:"+url;
         //return "redirect:"+host+"/default/index.html?token="+token+"&table_id="+tables.getId();//跳转到授权页面
        //return "redirect:http://localhost:8081/#/?token="+token+"&table_id="+tables.getId();//测试默认页面
    }


    protected boolean saveToken(String tag, User user, int days){
        String token = null;
        try {
            token = MD5Util.MD5Encode(tag+"_"+user.getAccount()+"#@#"+user.getId()+"#@#"+System.currentTimeMillis());
            TmpCache tmpCache = new TmpCache();
            tmpCache.setCValue(""+user.getId());
            tmpCache.setCKey(token);
            if(days == 0){
                days = tmpCache.getExpireTime();
            }else{
                days = 3600*1000*24*days;
            }
            tmpCache.setEndTime(tmpCache.getCreateTime().getTime()+ days);//管理员默认7天有效登录
            tmpCacheRepository.save(tmpCache);
            user.setAccessToken(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    protected boolean removeToken(User user){
        try {
            if(user.getAccessToken() != null) {
                TmpCache tmpCache = tmpCacheRepository.findOneByCKey(user.getAccessToken());
                if(tmpCache != null){
                    tmpCacheRepository.delete(tmpCache);
                }
                user.setAccessToken(null);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
