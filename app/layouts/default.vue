<template>
  <div>
    <!-- <Navbar class="fixed z-10 left-0 right-0 backdrop-blur" /> -->
    <main class="grow">
      <div class="relative">
        <div class="relative grow pb-[140px] flex flex-col max-w-[2000px] mx-auto w-full px-4 md:px-6 lg:px-10">
          <slot />
        </div>
      </div>
    </main>
    <!-- <Footer /> -->
  </div>
</template>
