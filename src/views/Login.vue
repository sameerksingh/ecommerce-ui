<template>
    <v-container class="text-center login-container pa-auto">
      <v-card>
        <v-card-title class="card-title">Hello!</v-card-title>
        <v-card-text>
          <v-form class="login-form-container" @submit.prevent="submitForm">
            <v-text-field class="login-input" v-model="username" label="Username" required></v-text-field>
            <v-text-field class="login-input" v-model="password" label="Password" type="password" required></v-text-field>
            <v-text-field class="login-input" v-if="mode === 'Register'" v-model="confirmPassword" label="Confirm Password" type="password" required></v-text-field>
            <v-btn class="login-button" type="submit" color="primary">{{ mode }}</v-btn>
          </v-form>
        <span class="login-error-message">{{ formError }}</span>
        </v-card-text>
        <ToggleInfo class="px-4" :info="'Click to show password rules'">
          <div>
            <span>The Password must have:</span>
            <ul>
              <li v-for="(rule, index) in passwordRules" :key="index">
                <span>{{ rule.description }}</span>
              </li>
            </ul>
          </div>
        </ToggleInfo>
        <div class="ma-4 box" @click="toggleMode">{{ mode === 'Login' ? 'Register here' : 'Sign in here' }}</div>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import ToggleInfo from '@/components/ToggleInfo.vue';
  
  export default {
    // eslint-disable-next-line 
    name: "Login",
    components: {ToggleInfo},
    data() {
      return {
        mode: 'Login',
        username: '',
        password: '',
        confirmPassword: '',
        formError: '',
        passwordRules: [
        { label: "Minimum Length", description: "At least 8 characters" },
        { label: "Uppercase Letters", description: "At least one uppercase letter" },
        { label: "Lowercase Letters", description: "At least one lowercase letter" },
        { label: "Numbers", description: "At least one number" },
        { label: "Special Characters", description: "At least one special character" }
      ]
      };
    },
    methods: {
      ...mapActions('auth', ['getToken', 'setUser', 'registerNewUser']), // Map getToken action from 'auth' module namespace
      validatePassword() {
        if (!this.username || !this.password || (this.mode == "Register" && !this.confirmPassword)) {
          return 'Please fill in all fields.';
        }
        if (this.mode=="Register" && this.password !== this.confirmPassword) {
          return "Password and confirm password don't match";
        }
        if (this.password.length < 8) {
            return this.passwordRules[0].description;
        }
        if (!/[A-Z]/.test(this.password)) {
            return this.passwordRules[1].description;
        }
        if (!/[a-z]/.test(this.password)) {
            return this.passwordRules[2].description;
        }
        if (!/\d/.test(this.password)) {
            return this.passwordRules[3].description;
        }
        if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?~]/.test(this.password)) {
            return this.passwordRules[4].description;
        }
        return '';
      },
      async submitForm() {
        this.formError = this.validatePassword()
        if (this.formError) {
          return ;
        }
        else if (this.mode == "Login"){
            try{
                await this.getToken({ username: this.username, password: this.password })
                await this.setUser(this.username)
                this.$router.push('/')
            }catch(error) {
                this.formError = "Invalid username or password"
                console.error('Login failed:', error)
            }
        }
        else{
          try{
              const requestBody = {
                  email: this.username,
                  password: this.password
              }
              this.formError = await this.registerNewUser(requestBody)
              if (this.formError) {
                console.error(this.formError)
                return ;
              }
              await this.getToken({ username: this.username, password: this.password })
              await this.setUser(this.username)
              this.$router.push('/')
          }catch(error) {
              this.formError = "Invalid username or password"
              console.error('Login failed:', error)
          }
        }
      },
      toggleMode() {
        this.mode = this.mode == 'Login' ? 'Register' : 'Login';
        this.formError = "";
      }
    }
  };
  </script>
  
<style scoped>
.box {
    color: darkblue;
    font-size: 12px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
    justify-content: center;
    cursor: pointer;
    text-decoration: underline;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  opacity: 75%;
}

/* Form container styling */
.login-form-container {
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Input field styling */
.login-input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
}

/* Button styling */
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

/* Error message styling */
.login-error-message {
  color: red;
  margin-bottom: 10px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  justify-content: center;
}
  </style>
  