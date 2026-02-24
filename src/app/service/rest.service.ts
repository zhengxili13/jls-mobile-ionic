import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './utils.service';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { ToastController, NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  private token: string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private utils: UtilsService,
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.loadToken();
  }

  loadToken() {
    this.token = 'Bearer ' + localStorage.getItem('jwt');
  }

  private readonly host = environment.SERVER_API_URL;
  private readonly waitingTime = environment.HTTP_WAITING_TIME;

  /*
  * Auth API endpoints
  */
  private readonly apiUrlRefreshToken = this.host + 'api/Token/Auth';
  private readonly apiUrlUpdateUserInfo = this.host + 'api/User/UpdateUserInfo';
  private readonly apiUrlRegistre = this.host + 'api/Account/Register';
  private readonly apiUrlLogin = this.host + 'api/Auth/Login';
  private readonly apiUrlSendPasswordResetLink = this.host + 'api/Account/SendPasswordResetLink';

  /*
  * Product API endpoints
  */
  private readonly apiUrlGetProductMainCategory = this.host + 'api/Product/GetProductMainCategory';
  private readonly apiUrlGetProductSecondCategory = this.host + 'api/Product/GetProductSecondCategory';
  private readonly apiUrlGetProductListBySecondCategory = this.host + 'api/Product/GetProductListBySecondCategory';
  private readonly apiUrlGetProductInfoByReferenceIds = this.host + 'api/Product/GetProductInfoByReferenceIds';
  private readonly apiUrlGetProductListByPublishDate = this.host + 'api/Product/GetProductListByPublishDate';
  private readonly apiUrlGetProductListBySalesPerformance = this.host + 'api/Product/GetProductListBySalesPerformance';
  private readonly apiUrlGetPromotionProduct = this.host + 'api/Product/GetPromotionProduct';
  private readonly apiUrlGetProductById = this.host + 'api/Product/GetProductById';
  private readonly apiUrlSaveProductComment = this.host + 'api/Product/SaveProductComment';
  private readonly apiUrlGetProductCommentListByCriteria = this.host + 'api/Product/GetProductCommentListByCriteria';
  private readonly apiUrlGetFavoriteListByUserId = this.host + 'api/Product/GetFavoriteListByUserId';
  private readonly apiUrlAddIntoProductFavoriteList = this.host + 'api/Product/AddIntoProductFavoriteList';
  private readonly apiUrlSimpleProductSearch = this.host + 'api/Product/SimpleProductSearch';
  private readonly apiUrlAdvancedProductSearchClient = this.host + 'api/Product/AdvancedProductSearchClient';
  private readonly apiUrlGetProductByPrice = this.host + 'api/Product/GetProductByPrice';

  /*
  * Address API endpoints
  */
  private readonly apiUrlGetUserShippingAdress = this.host + 'api/Adress/GetUserShippingAdress';
  private readonly apiUrlGetUserFacturationAdress = this.host + 'api/Adress/GetUserFacturationAdress';
  private readonly apiUrlGetUserDefaultShippingAdress = this.host + 'api/Adress/GetUserDefaultShippingAdress';
  private readonly apiUrlCreateOrUpdateAdress = this.host + 'api/Adress/CreateOrUpdateAdress';

  /*
  * Order API endpoints
  */
  private readonly apiUrlSaveOrder = this.host + 'api/Order/SaveOrder';
  private readonly apiUrlGetOrdersListByUserId = this.host + 'api/Order/GetOrdersListByUserId';
  private readonly apiUrlGetOrdersListByOrderId = this.host + 'api/Order/GetOrdersListByOrderId';

  /*
  * Reference API endpoints
  */
  private readonly apiUrlGetReferenceItemsByCategoryLabels = this.host + 'api/Reference/GetReferenceItemsByCategoryLabels';
  private readonly apiUrlGetWbesiteslides = this.host + 'api/Reference/GetWbesiteslides';

  /*
  * User API endpoints
  */
  private readonly apiUrlCheckUserIsAlreadyExistAsync = this.host + 'api/User/CheckUserIsAlreadyExistAsync';
  private readonly apiUrlGetUserById = this.host + 'api/User/GetUserById';

  /*
  * Message API endpoints
  */
  private readonly apiUrlSaveMessage = this.host + 'api/Message/SaveMessage';
  private readonly apiUrlGetMessageByUserAndStatus = this.host + 'api/Message/GetMessageByUserAndStatus';
  private readonly apiUrlUpdateMessageStatus = this.host + 'api/Message/UpdateMessageStatus';
  private readonly apiUrlGetNoReadMessageCount = this.host + 'api/Message/GetNoReadMessageCount';


  GetNoReadMessageCount(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlGetNoReadMessageCount, { params });
  }

  UpdateUserInfo(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlUpdateUserInfo, criteria);
  }

  UpdateMessageStatus(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlUpdateMessageStatus, criteria);
  }

  GetMessageByUserAndStatus(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlGetMessageByUserAndStatus, { params });
  }

  GetProductByPrice(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlGetProductByPrice, { params });
  }

  AdvancedProductSearchClient(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlAdvancedProductSearchClient, criteria);
  }

  SimpleProductSearch(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlSimpleProductSearch, { params });
  }

  GetFavoriteListByUserId(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlGetFavoriteListByUserId, { params });
  }

  AddIntoProductFavoriteList(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlAddIntoProductFavoriteList, { params });
  }

  /** Refresh token using existing refresh_token */
  getNewRefreshToken1(LoginInfo: any): Observable<any> {
    LoginInfo.GrantType = 'refresh_token';
    LoginInfo.RefreshToken = localStorage.getItem('refreshToken');
    LoginInfo.UserName = localStorage.getItem('username');
    return this.postUrlReturn(this.apiUrlRefreshToken, LoginInfo);
  }

  /** Obtain a new token with username/password */
  getNewRefreshToken(LoginInfo: any): Observable<any> {
    LoginInfo.GrantType = 'password';
    LoginInfo.UserName = LoginInfo.Email;
    return this.postUrlReturn(this.apiUrlRefreshToken, LoginInfo);
  }

  async logout(notNavigateToHome?: boolean) {
    localStorage.clear();

    this.storage.remove('userId');
    this.storage.remove('jwt');
    this.storage.remove('refreshToken');

    this.utils.isLoginedSubject.next(false);

    if (notNavigateToHome == null || notNavigateToHome === false) {
      this.navCtrl.navigateRoot('');
      return;
    }

    const toast = await this.toastCtrl.create({
      message: this.translate.instant('Msg_ReLogin'),
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }

  GetReferenceItemsByCategoryLabels(criteria: any): Observable<any> {
    criteria.Lang = this.translate.defaultLang;
    return this.postUrlReturn(this.apiUrlGetReferenceItemsByCategoryLabels, criteria);
  }

  GetWbesiteslides(criteria: any): Observable<any> {
    return this.http.get(this.apiUrlGetWbesiteslides);
  }

  Registre(RegistrerInfo: object): Observable<any> {
    return this.postUrlReturn(this.apiUrlRegistre, RegistrerInfo);
  }

  Login(LoginInfo: object): Observable<any> {
    return this.http.post(this.apiUrlLogin, LoginInfo);
  }

  SendPasswordResetLink(Email: string): Observable<any> {
    const params = new HttpParams({ fromObject: { username: Email } });
    return this.http.get(this.apiUrlSendPasswordResetLink, { params });
  }

  /* Product */

  GetProductMainCategory(): Observable<any> {
    const lang = this.translate.defaultLang || 'fr';
    const params = new HttpParams({ fromObject: { Lang: lang } });
    return this.http.get(this.apiUrlGetProductMainCategory, { params });
  }

  GetProductSecondCategory(MainCategoryReferenceId: number): Observable<any> {
    const lang = this.translate.getDefaultLang();
    const params = new HttpParams({
      fromObject: {
        MainCategoryReferenceId: MainCategoryReferenceId.toString(),
        Lang: lang
      }
    });
    return this.http.get(this.apiUrlGetProductSecondCategory, { params });
  }

  GetProductListByPublishDate(Begin: number, Step: number): Observable<any> {
    const lang = this.translate.getDefaultLang() || 'fr';
    return this.getUrlReturn(this.apiUrlGetProductListByPublishDate, { Lang: lang, Begin, Step });
  }

  GetProductListBySalesPerformance(Begin: number, Step: number): Observable<any> {
    const lang = this.translate.getDefaultLang() || 'fr';
    const params = new HttpParams({
      fromObject: { Lang: lang, Begin: Begin.toString(), Step: Step.toString() }
    });
    return this.http.get(this.apiUrlGetProductListBySalesPerformance, { params });
  }

  GetPromotionProduct(Begin: number, Step: number): Observable<any> {
    const lang = this.translate.getDefaultLang() || 'fr';
    const params = new HttpParams({
      fromObject: { Lang: lang, Begin: Begin.toString(), Step: Step.toString() }
    });
    return this.http.get(this.apiUrlGetPromotionProduct, { params });
  }

  GetProductListBySecondCategory(SecondCategoryReferenceId: number, Begin: number, Step: number): Observable<any> {
    const lang = this.translate.getDefaultLang();
    const params = new HttpParams({
      fromObject: {
        SecondCategoryReferenceId: SecondCategoryReferenceId.toString(),
        Lang: lang,
        Begin: Begin.toString(),
        Step: Step.toString()
      }
    });
    return this.http.get(this.apiUrlGetProductListBySecondCategory, { params });
  }

  GetProductInfoByReferenceIds(ReferenceIds: any): Observable<any> {
    const lang = this.translate.defaultLang;
    return this.postUrlReturn(this.apiUrlGetProductInfoByReferenceIds, { ReferenceIds, Lang: lang });
  }

  GetProductById(Id: number): Observable<any> {
    const lang = this.translate.defaultLang;
    const userId = localStorage.getItem('userId') || '0';
    const params = new HttpParams({
      fromObject: { ProductId: Id.toString(), Lang: lang, UserId: userId.toString() }
    });
    return this.http.get(this.apiUrlGetProductById, { params });
  }

  /* Product comment */

  SaveProductComment(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlSaveProductComment, criteria);
  }

  GetProductCommentListByCriteria(criteria: any): Observable<any> {
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(this.apiUrlGetProductCommentListByCriteria, { params });
  }

  /* Order */

  SaveOrder(References: any[], ShippingAdressId: number, FacturationAdressId: number, UserId: number, ClientRemark: string): Observable<any> {
    return this.postUrlReturn(this.apiUrlSaveOrder, {
      References, ShippingAdressId, FacturationAdressId, UserId, ClientRemark
    });
  }

  GetOrdersListByUserId(UserId: number, OrderStatus: string): Observable<any> {
    const lang = this.translate.defaultLang;
    const params = new HttpParams({
      fromObject: { UserId: UserId.toString(), Lang: lang, StatusCode: OrderStatus }
    });
    return this.http.get(this.apiUrlGetOrdersListByUserId, { params });
  }

  GetOrdersListByOrderId(OrderId: number): Observable<any> {
    const lang = this.translate.defaultLang;
    return this.getUrlReturn(this.apiUrlGetOrdersListByOrderId, { OrderId, Lang: lang });
  }

  /* Address */

  GetUserFacturationAdress(UserId: any): Observable<any> {
    const params = new HttpParams({ fromObject: { UserId: UserId.toString() } });
    return this.http.get(this.apiUrlGetUserFacturationAdress, { params });
  }

  GetUserDefaultShippingAdress(UserId: any): Observable<any> {
    const params = new HttpParams({ fromObject: { UserId: UserId.toString() } });
    return this.http.get(this.apiUrlGetUserDefaultShippingAdress, { params });
  }

  GetUserShippingAdress(UserId: any): Observable<any> {
    const params = new HttpParams({ fromObject: { UserId: UserId.toString() } });
    return this.http.get(this.apiUrlGetUserShippingAdress, { params });
  }

  CreateOrUpdateAdress(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlCreateOrUpdateAdress, criteria);
  }

  /* Message */

  SaveMessage(criteria: any): Observable<any> {
    return this.postUrlReturn(this.apiUrlSaveMessage, criteria);
  }

  /* User */

  CheckUserIsAlreadyExistAsync(Username: any): Observable<any> {
    const params = new HttpParams({ fromObject: { Username } });
    return this.http.get(this.apiUrlCheckUserIsAlreadyExistAsync, { params });
  }

  GetUserById(UserId: any): Observable<any> {
    const params = new HttpParams({ fromObject: { UserId } });
    return this.http.get(this.apiUrlGetUserById, { params });
  }


  private getUrlReturn(url: string, criteria: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', this.token)
      .set('Content-Type', 'application/json');
    const params = new HttpParams({ fromObject: criteria });
    return this.http.get(url, { headers, params }).pipe(timeout(this.waitingTime), catchError(this.handleError));
  }

  private postUrlReturn(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', this.token)
      .set('Content-Type', 'application/json');
    return this.http.post(url, body, { headers }).pipe(timeout(this.waitingTime), catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    if (error.error instanceof ErrorEvent) {
      if (error.name != null && error.name === 'TimeoutError') {
        return throwError({ Msg: 'Network timeout, please check your network connection', Success: false });
      }
      console.error('Client error: ', error.error.message);
    } else {
      return throwError(error.error);
    }
  }
}
