<template>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-5">Please enter your login and password!</p>
                  <div class="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" class="form-control form-control-lg" v-model="email" />
                    <label class="form-label" for="typeEmailX">Email</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg" v-model="password" />
                    <label class="form-label" for="typePasswordX">Password</label>
                  </div>
                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit" @click="handlelogin">Login</button>
                </div>
                <div>
                  <p class="mb-0">Don't have an account? <RouterLink to="/signup" class="text-white-50 fw-bold">Sign Up</RouterLink></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  

<style scoped>
.gradient-custom {
/* fallback for old browsers */
background: #6a11cb;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>

<script setup>
import {ref, resolveComponent} from "vue";
import {useRouter, RouterLink} from "vue-router"
import SignUp from '../views/SignUpPage.vue'

const email = ref("");
const password = ref("");
const router = useRouter();

const handlelogin = async () => {
    try{
        const res = await fetch('http://localhost:3100/api/akun/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });
        if (!res.ok){
            const errorMsg = (await res.json())?.errors[0].message;
            throw new Error(errorMsg)
        }
        const user = await res.json();
        console.log(user);
        router.push('/home')
    } catch (error) {
        alert("Login Error " + error.message)
    }
}
</script>