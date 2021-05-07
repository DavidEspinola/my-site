<template>
  <v-row>
    <v-col class="text-center">
      <h1 class="text-h2 mb-4 hidden-print-only">{{ $t('title') }}</h1>

      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<i18n lang="yaml">
en:
  title: Contact
es:
  title: Contacto
</i18n>
