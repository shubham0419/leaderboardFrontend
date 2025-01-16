import { atom, selector, selectorFamily} from 'recoil';

export const userAtom = atom({
  key: 'user',
  default: {
    state:1
  } as authAtom
});

// user id getter
export const userIdSelector = selector<string | undefined >({
  key: 'getUserId',
  get: ({ get }) => {
    const auth = get(userAtom);
    return auth?.loginOTPRes?.data ?? undefined;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
        userDetails:{
          ...prev.userDetails,
          _id:val as string
        }
      }
    ))
  }
});

// user data selector
export const userDataSelector = selector<User | undefined >({
  key: 'userDataSelector',
  get: ({ get }) => {
    const auth = get(userAtom);
    return auth.userDetails ?? undefined;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      userDetails:val as User
    }))
  }
})

// mentor data selector
export const mentorDataSelector = selector<Mentor | undefined >({
  key: 'mentorDataSelector',
  get: ({ get }) => {
    const auth = get(userAtom);
    return auth.mentorDetails ?? undefined;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      mentorDetails:val as Mentor
    }))
  }
})

//otp response selector
export const otpResSelector = selector<loginOTPResType>({
  key: 'otpRes',
  get: ({ get }) => {
    const auth = get(userAtom);
    return auth.loginOTPRes ?? {} as loginOTPResType;
  },
  set:({set},val)=>{
    set(userAtom,(prev)=>({
      ...prev,
      loginOTPRes:val as loginOTPResType
    }))
  }
})



//email number input
export const emailSelector = selector<string>({
  key: 'mobilenumber',
  get: ({ get }) => {
    const user = get(userAtom);
    return user?.loginform?.email ?? "";
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:{...prev.loginform,email:val as string}
    }))
  }
});

// authState
export const authStateSelector = selector<number>({
  key: 'authState',
  get: ({ get }) => {
    const auth = get(userAtom);
    return auth.state ?? 1;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      state:val as number
    }))
  }
})

// otp
export const otpSelector = selector<string>({
  key: 'otp',
  get: ({ get }) => {
    const user = get(userAtom);
    return user?.loginform?.otp ?? "";
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:{...prev.loginform,otp:val as string}
    }))
  }
})

// isAdminSelector
export const isAdminSelector = selector<boolean>({
  key: 'isAdmin',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.isAdmin ?? false;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      isAdmin:val as boolean
    }))
  }
})

// isMentor selector
export const isMentorSelector = selector<boolean>({
  key: 'isMentor',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.isMentor ?? false;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      isMentor:val as boolean
    }))
  }
})