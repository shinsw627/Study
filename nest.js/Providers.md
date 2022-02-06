[Nest.js - Providers - Velog 글 바로가기](https://velog.io/@shinsw627/Nest.js-Providers-feat.-Dependency-Injection)
<br>
저의 블로그 입니다. 가독성을 위해 블로그에서 보시는 것을 추천드립니다.
<br>
Provider의 역할은 Controller, Service, Repository, Factory, Helper 등의 Dependency를 등록하는 곳이라 할 수 있다.
@Injectable() 이라는 Decorator로 선언하여 Dependency 등록할 수 있다.

간단하게 Providers 라는 개념을 통해 Service Dependency를 만들어 보겠다.

```ts
// cats.service.ts
@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  //회원가입
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new ConflictException("해당하는 고양이는 이미 존재합니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.createCat({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
```

Injectable 데코레이터를 통해 Singleton의 Dependency가 생기게 되는데 Controller에 존재했던 로직은 Service 영역으로 책임과 역할을 수행하도록 로직을 옮겼다.
위의 선언된 Method 들은 데이터를 생성 조회 조작 하는 단순한 역할을 담당한다.

이 Injectable로 선언된 Dependency는 Nest Runtime 시 Singleton의 객체로 메모리상에 존재하게 되는데 어떻게 Controller에서 사용되는지 알아보자.

```ts
//cats.controller.ts

@Controller("cats")
export class CatsController {
  // 의존성 주입
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
}
```

Controller의 코드를 보면 생성자가 존재하고 해상 생성자에는 CatsService라는 타입의 catsService argument를 받아 CatsController 내부의 멤버 변수에 주입하게 된다.

이 상황을 DI (Dependency Injection) 이라고 말한다.
