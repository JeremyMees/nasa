<template>
  <div>
    <Navigation />
    <main class="grow">
      <div class="relative">
        <div class="relative grow pt-6 pb-[140px] flex flex-col max-w-[2000px] mx-auto w-full px-4 md:px-6 lg:px-10">
          <slot />
        </div>
      </div>
    </main>
    <!-- <Footer /> -->
  </div>
</template>
